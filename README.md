# Decentralization Technologies - TD 2

Here is the file that be useful to do the project. I documented here all the steps and the answers to the questions asked in the `README.md` file.

## Torrent

### Download the package

Here the command to download the package:
[download_torrent](captures/download_torrent.png)

### Check the installation

Here the command to check the installation:
[check_installation](captures/check_installation.png)

### Q1 - Create a torrent containing 'chaton.jpeg'

Here the command to create the torrent:
```bash
torrent create resources/chaton.jpeg -o chaton.torrent
```
[create_torrent_chaton](captures/create_torrent_chaton.png)

### Q2 - Copy the image to a new directory named `partition1` and create a torrent of this directory

Here the commands to copy the image, then create the torrent (in the `partition1` directory already created):
```bash
copy resources\chaton.jpeg partition1\
torrent create partition1 -o partition1.torrent
```
[copy_image](captures/copy_image.png)
[create_torrent_partition1](captures/create_torrent_partition1.png)

We can see that creating a torrent for a folder includes all the files in the folder.

### Q3 - Copy the directory `partition1` to a new directory named `partition2` and create a torrent of this directory

Here the commands to copy the directory, then create the torrent (in the `partition2` directory already created):
```bash
xcopy partition1\ partition2\ /e
torrent create partition2 -o partition2.torrent
```
[copy_folder](captures/copy_folder.png)
[create_torrent_partition2](captures/create_torrent_partition2.png)

We can see that, even though we copied the entire `partition1` folder to `partition2`, the resulting `partition2.torrent` will still reference the original image from the `partition1` folder.

## IPFS

IPFS Desktop and IPFS CLI are installed on my computer. I will use the IPFS CLI to do the project.

### Q1 - Upload the image to IPFS

Here the command to upload the image to IPFS:
```bash
ipfs add resources/chaton.jpeg
```
[upload_ipfs](captures/upload_ipfs.png)

### Q2 - Upload the directory `partition1` to IPFS

Here the command to upload the directory to IPFS:
```bash
ipfs add -r partition1
```
[upload_ipfs_partition1](captures/upload_ipfs_partition1.png)

Unlike torrent, IPFS does not create separate torrent files. Instead, it creates a hash for each file and folder. This hash can be used to retrieve the file or folder from the IPFS network.

### Create your first decentralized website

#### Upload files on IPFS using Pinata

I used the Pinata service to upload the files. First, I installed node_modules:
```bash
npm install axios form-data fs
```

Then, I created a file `upload_pinata.js`. I made sure that I have created an account on Pinata and got my JWT.
```javascript
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
```

Now, I can upload the file to IPFS using Pinata:
```bash
node upload_pinata.js
```
[upload_pinata](captures/upload_pinata.png)

My file is now uploaded to IPFS using Pinata. You can see the result [here](https://green-worthy-takin-113.mypinata.cloud/ipfs/QmeJaufp9seXCpHMFwxX53P3oRQW8Ny1DduCXAxebEwxv7).

#### Leverage P2P to create a website hosted decentralizely

Now, I added a GitHub Action to automatically upload the modification made to the files to IPFS using Pinata. Here is the content of the `.github/workflows/cd.yml` file:
```yaml
name: CD

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v2
        
      - name: IPFS Pinata deploy GitHub action      
        uses: popovoleksandr/ipfs-pinata-deploy-action@v1.6.3
        with:
          pin-name: 'My cat site'
          path: './resources'
          pinata-api-key: 06f110bc807e29435359
          pinata-secret-api-key: edbceac41e9bf6cd1a5a1b408ce16771131e4ff98e80c3a3ba44f6092ee4e67f
          verbose: true
          remove-old: false
```

I re-created a new API key and secret key on Pinata, and I added them to the cd.yml file directly.

[api_keys](captures/api_keys.png)

Now, you should be able to see the website and the actions generated at each push and pull request on the repository. Here's a quick vue, on pinata, of the website: [My cat website](https://green-worthy-takin-113.mypinata.cloud/ipfs/QmcqB8FRtJB7bHwM1yF5XNXm6hMMVz9Wv5d5Y5uCgHiaof/).

[website_pinata](captures/website_pinata.png)
