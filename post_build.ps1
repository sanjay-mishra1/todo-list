$folderName=Split-Path -Path (Get-Location) -Leaf
$destinationFolderPath="D:\test\DestinationFolder\"+$folderName
if (![System.IO.Directory]::Exists($destinationFolderPath))
{
 mkdir $destinationFolderPath
  $destinationFolderPath=$destinationFolderPath+"\V1"

}else{
  $count= (get-childitem -Path $destinationFolderPath | where-object { $_.PSIsContainer }).Count
  $destinationFolderPath=$destinationFolderPath+"\V"+($count+1);
}
  mkdir $destinationFolderPath

Move-Item "./build" -Destination $destinationFolderPath -force