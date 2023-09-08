import { Injectable, ViewChild, ChangeDetectorRef} from '@angular/core';
import { environment } from './../../../../environments/environment';
import * as tus from 'tus-js-client';
import { Observable, Subject } from 'rxjs';
import { ConfigService } from '../shared/config.service';

import { UploadFileTUS } from '../../_models/files';
import { HttpEvent, HttpEventType, HttpProgressEvent } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadTUSService {

    private endpoint = '/helper/importFile';
    private chunked = environment.config.chunkSizeTUS;
    private userData: {_token: string} = JSON.parse(localStorage.getItem('userData'));

    private uploadStatus: Subject<UploadFileTUS[]> ;
    public uploadProgress: Observable<any> ;

    constructor(
      private cs: ConfigService,
    ){
      this.uploadStatus = new Subject<UploadFileTUS[]>();
      this.uploadProgress = this.uploadStatus.asObservable()
    }

    fileStatusArr: UploadFileTUS[] = [];

    /**
     * Upload file using TUS protocol
     * @param file - File
     * @param filename - Name to upload
     * @param fileURL - Get uncompleted file id
     * @returns Object
    **/

    uploadFile(file: File, filename: string, fileURL = null): void {
      // Only continue if a file has been selected
      if (!file) {
        return
      }
      if (!tus.isSupported) {
        alert('This browser does not support uploads. Please use a modern browser instead.')
      }

      const fileStatus: UploadFileTUS = {filename, progress: 0, hash: '', uuid: '', status: 'PENDING', time: 0};

      this.fileStatusArr.push(fileStatus);

      this.uploadStatus.next(this.fileStatusArr);

      console.log(this.fileStatusArr)

      const options = {
        endpoint: this.cs.getEndpoint() + this.endpoint,
        headers: {
          Authorization: `Bearer ${this.userData._token}`,
          'Tus-Resumable':'1.0.0',
          'Tus-Extension': 'checksum',
          'Tus-Checksum-Algorithm': 'md5,sha1,crc32'
        },
        // uploadUrl: fileURL,
        retryDelays: [0, 3000, 6000, 9000, 12000],
        chunkSize: this.chunked,
        metadata: {
          filename,
          filetype: file.type,
        },
        onError: async (error) => {
          const exist = String(error).includes('exists!');
          if (exist) {
            this.fileStatusArr.forEach(value => {
              if (value.filename === filename) {
                value.status = 'EXISTED';
                value.time = Date.now();
                this.uploadStatus.next(this.fileStatusArr);
              }
            });
          } else {
            window.alert(`Failed because: ${error}`)
          }
          return false;
        },
        // onError: async (error) => {
        //   console.log(error);
        //   return false;
        // },
        onChunkComplete: (chunkSize, bytesAccepted, bytesTotal) => {
          this.fileStatusArr.forEach(value => {
            if (value.filename === filename) {
              value.progress = Math.floor(bytesAccepted / bytesTotal * 100);
              value.status = 'IN_PROGRESS';
              value.uuid = upload.url.split('/').slice(-1)[0];
            }
          });
          this.uploadStatus.next(this.fileStatusArr);
        },
        onSuccess: async () => {
          this.fileStatusArr.forEach(value => {
            if (value.filename === filename) {
              value.progress = 100;
              value.time = Date.now();
              value.status = 'DONE';
            }
          });
          this.uploadStatus.next(this.fileStatusArr);
          return true;
        }
      }

      const upload = new tus.Upload(file, options);

      checkPreviousuploads(upload).catch((error) => {
        console.error(error)
      })

      async function checkPreviousuploads(upload) {
        let previousUploads = await upload.findPreviousUploads()

        // We only want to consider uploads in the last hour.
        const limitUpload = Date.now() - 3 * 60 * 60 * 1000
        previousUploads = previousUploads
          .map((upload) => {
            upload.creationTime = new Date(upload.creationTime)
            return upload
          })
          .filter((upload) => upload.creationTime > limitUpload)
          .sort((a, b) => b.creationTime - a.creationTime)

        if (previousUploads.length === 0) {
          upload.start();
        }

        // File already exist in the import folder, then return progress as 100

        upload.start();

      }

    }

    isHttpProgressEvent(event: HttpEvent<unknown>): event is HttpProgressEvent {
      return (
        event.type === HttpEventType.DownloadProgress ||
        event.type === HttpEventType.UploadProgress
      );
    }
  }

