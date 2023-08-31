import { StorageReference, getDownloadURL } from "firebase/storage";
import { saveOnStorage } from "./handleStorage";

export const getProfileImage = async (storageRef: StorageReference) => {
  const profileImage = await getDownloadURL(storageRef)
    .then((url) => {
      saveOnStorage("profileImage", url);
      return url;
    })
    .catch((error) => {
      console.log(error);
    });
    if (!profileImage) return null;
    return profileImage;
};
