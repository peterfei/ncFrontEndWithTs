import SparkMD5 from 'spark-md5'

export default class Utils {
  static CHUNK_SIZE = 2097152

  static getAttachmentType(file: any) {
    let type = 'other'
    let ext = ''
    if (file.name.indexOf('.') !== -1) {
      const t = file.name.split('.')
      ext = t[t.length - 1]
      switch (ext) {
        case 'doc':
        case 'docx':
          type = 'doc'
          break
        case 'xls':
        case 'xlsx':
          type = 'excel'
          break
        case 'ppt':
        case 'pptx':
          type = 'ppt'
          break
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'git':
        case 'bmp':
          type = 'images'
          break
        case 'html':
        case 'htm':
          type = 'html'
          break
        case 'zip':
        case 'rar':
        case '7z':
          type = 'zip'
          break
        default:
          type = 'other'
      }
    }
    return { type, ext }
  }
  static getFileMD5(file: File, opt: any = {}): Promise<any> {
    var running = false
    return new Promise((resolve, reject) => {
      if (running) {
        reject('has running')
      }
      const blobSlice = File.prototype.slice
      const chunkSize = opt.chunkSize || this.CHUNK_SIZE
      const chunks = Math.ceil(file.size / chunkSize)
      let currentChunk = 0
      const spark = new SparkMD5()
      const fileReader = new FileReader()

      const loadNext = function() {
        let start = currentChunk * chunkSize
        let end = start + chunkSize >= file.size ? file.size : start + chunkSize
        fileReader.readAsBinaryString(blobSlice.call(file, start, end))
      }

      fileReader.onload = e => {
        if (!fileReader.result) {
          reject('something went wrong')
          return
        }
        spark.appendBinary(fileReader.result.toString())
        currentChunk += 1
        if (currentChunk < chunks) {
          loadNext()
        } else {
          resolve(spark.end())
        }
      }

      fileReader.onerror = () => {
        console.log('something went wrong')
        reject('something went wrong')
      }
      loadNext()
    })
  }
}
