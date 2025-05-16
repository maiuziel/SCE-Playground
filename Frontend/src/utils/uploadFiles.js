export const uploadFiles = async (file, resourceType = 'image') => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'unsigned_upload');

  const cloudName = 'deyb2gso9';
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

  console.log('Uploading to Cloudinary:', file.name);

  const res = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    console.error('Cloudinary upload error:', data);
    throw new Error('Upload failed');
  }

  console.log('Upload success:', data.secure_url);
  return data.secure_url;
};
