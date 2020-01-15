import { IUploadPolicy } from './../types/index'
import Request from '@/utils/request'

const UPLOAD_POLICY_URL = '/api/upload_policy'
const RESOURCE_CALLBACK_URL = '/api/resource'

export function getUploadPolicy(
  md5: string,
  extension?: string,
  isPrivate?: boolean
) {
  const params = {
    file_md5: md5,
    is_private: isPrivate ? null : 0,
    file_extension: extension
  }
  console.log(process.env.VUE_APP_API_HOST)
  return Request.get(UPLOAD_POLICY_URL, params)
}

export function postUploadFile(policyInfo: IUploadPolicy, file: File) {
  const headers = {
    'Content-Type': 'mulipart/form-data'
  }
  const fname = policyInfo.filename || file.name
  const formData = new FormData()
  formData.append('OSSAccessKeyId', policyInfo.accessid)
  formData.append('policy', policyInfo.policy)
  formData.append('Signature', policyInfo.signature)
  formData.append('key', policyInfo.dir + fname)
  formData.append('success_action_status', '200')
  formData.append('file', file)
  return Request.post(policyInfo.host, formData, { headers })
    .then(() => {
      return `${policyInfo.host}/${policyInfo.dir}${fname}`
    })
    .catch(err => {
      console.log('err', err)
      return Promise.reject(err)
    })
}

export function postAttachmentCallback(
  file: File,
  opt: { md5: string; ossUrl: string; type: string; ext: string }
) {
  const headers = {
    'Content-Type': 'application/json'
  }
  const url = `${RESOURCE_CALLBACK_URL}?api_token=123`
  const data = {
    type: 5,
    title: file.name,
    file_md5: opt.md5,
    size: file.size,
    oss_url: opt.ossUrl,
    attachment_type: opt.type,
    ext: opt.ext,
    is_private: 0
  }
  return Request.post(url, data, { headers })
}
