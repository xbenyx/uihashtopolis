export interface Filetype {
  _expandable: string,
  startAt: number,
  maxResults: number,
  total: number,
  isLast: boolean,
  values:{
    fileId: number,
    filename: string,
    size: number,
    isSecret: number,
    fileType: number,
    accessGroupId: number,
    lineCount:number
    accessGroup: {
      accessGroupId: number,
      groupName: string
    }
  }
}
