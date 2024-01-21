import ImgCrop from 'antd-img-crop';
import Upload, { UploadProps } from 'antd/es/upload';
import type { ImgCropProps } from 'antd-img-crop';
import React from 'react';

const ImgCropUpload: React.FC<UploadProps & ImgCropProps> = (props) => (
  <ImgCrop>
    <Upload {...props} />
  </ImgCrop>
);

export default ImgCropUpload;
