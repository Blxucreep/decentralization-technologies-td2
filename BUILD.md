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

We can see that, even though you copied the entire `partition1` folder to `partition2`, the resulting `partition2.torrent` will still reference the original image from the `partition1` folder.

## IPFS

IPFS Desktop and IPFS CLI are installed on my computer. I will use the IPFS CLI to do the project.

### Q1 - Upload the image to IPFS

