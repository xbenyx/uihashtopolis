import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Upload } from 'tus-js-client';

import { UploadFileTUS } from '../../models/files';
import { Configuration } from '../configuration';

@Injectable({
  providedIn: 'root'
})

export class UploadTUSService {

    private endpoint = Configuration.BASE_URL_APIV1 + '/ui/files/import';  // V1 API
    private chunked = Configuration.CHUNK_SIZE_TUS;  // V1 API
    private userData: {_token: string} = JSON.parse(localStorage.getItem('userData'));

    private uploadStatus = new Subject<UploadFileTUS[]>();
    uploadProgress = this.uploadStatus.asObservable();

    fileStatusArr: UploadFileTUS[] = [];

    uploadFile(file: File, filename: string) {
      const fileStatus: UploadFileTUS = {filename, progress: 0, hash: '', uuid: ''};

      console.log(fileStatus)

      this.fileStatusArr.push(fileStatus);

      this.uploadStatus.next(this.fileStatusArr);

      const upload = new Upload(file, {
        endpoint: this.endpoint,
        headers: {
          Authorization: `Bearer ${this.userData._token}`,
          'Tus-Resumable':'1.0.0'
        },
        retryDelays: [0, 3000, 6000, 10000, 20000],
        chunkSize: this.chunked,
        metadata: {
          filename,
          filetype: file.type
        },
        onError: async (error) => {
          if (error) {
            if (window.confirm(`Failed because: ${error}\nDo you want to retry?`)) {
              upload.start()
              return false;
            }
          } else {
            window.alert(`Failed because: ${error}`)
          }
          return false;
        },
        onChunkComplete: (chunkSize, bytesAccepted, bytesTotal) => {
          this.fileStatusArr.forEach(value => {
            if (value.filename === filename) {
              value.progress = Math.floor(bytesAccepted / bytesTotal * 100);
              value.uuid = upload.url.split('/').slice(-1)[0];
            }
          });
          this.uploadStatus.next(this.fileStatusArr);
        },
        onSuccess: async () => {
          this.fileStatusArr.forEach(value => {
            if (value.filename === filename) {
              value.progress = 100;
            }
          });
          this.uploadStatus.next(this.fileStatusArr);
          return true;
        }
      });
      upload.start();
    }
  }

  // Look for check-sum, section extension
