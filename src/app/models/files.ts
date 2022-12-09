export interface Filetype {
  fileId: number;
  filename: string;
  size: number;
  isSecret: boolean;
  fileType: number;
  accessGroupId: number;
  lineCount: number;
  accessGroup: {
    accessGroupId: number;
    groupName: string
  }
}
