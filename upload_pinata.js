const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1NDE3OTkwMC0xNjVjLTQyZTEtYmRjYS02YTJhNDBiNjZjYWEiLCJlbWFpbCI6ImxvZXZhbmxxY0BvdXRsb29rLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJiYWY3NTJkOTUwMzE2NjgxZGVhNSIsInNjb3BlZEtleVNlY3JldCI6IjRkZGNlNmE2ZmM3YmUyNmJlODVhNDZjMzMxZWQ2MzVmYzJjNjBhNmZjMzRmNWU1M2Y1NzlhZDhiYjI2MmViMmMiLCJpYXQiOjE3MDc2MTY1NzR9.QeBQwa3T5CXBncgb-yXbsV_vmQ0gX_d6y1jfzKfv-ks'

const pinFileToIPFS = async () => {
    const formData = new FormData();
    const src = "resources/chaton.jpeg";
    
    const file = fs.createReadStream(src)
    formData.append('file', file)
    
    const pinataMetadata = JSON.stringify({
      name: 'chaton.jpeg',
    });
    formData.append('pinataMetadata', pinataMetadata);
    
    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    })
    formData.append('pinataOptions', pinataOptions);

    try{
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          'Authorization': `Bearer ${JWT}`
        }
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
}

pinFileToIPFS()