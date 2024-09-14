import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.farmverse.farmverse",
  projectId: "66e48f0e002d69ccdc00",
  storageId: "66e492b6001bb7c4743c",
  databaseId: "66e490e5003b71014815",
  userCollectionId: "66e49107001bbe2118fb",
  imageCollectionId: "66e4912e002fa85fbb26",
};

const client = new Client()
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register user
export async function createUser(email, password, username) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw new Error("Account creation failed");

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    console.error("Create User Error:", error);
    throw new Error("User creation failed");
  }
}

// Sign In
export async function signIn(email, password) {
  try {
    const session = await account.createEmailSession(email, password);
    if (!session) throw new Error("Session creation failed");
    return session;
  } catch (error) {
    console.error("Sign In Error:", error);
    throw new Error("Sign In failed");
  }
}

// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();
    return currentAccount;
  } catch (error) {
    console.error("Get Account Error:", error);
    throw new Error("Failed to get account");
  }
}

// Get Current User
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw new Error("No current account");

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser || currentUser.documents.length === 0)
      throw new Error("User not found");

    return currentUser.documents[0];
  } catch (error) {
    console.error("Get Current User Error:", error);
    return null;
  }
}

// Sign Out
export async function signOut() {
  try {
    await account.deleteSession("current");
  } catch (error) {
    console.error("Sign Out Error:", error);
    throw new Error("Sign Out failed");
  }
}

// Upload File
export async function uploadFile(file, type) {
  if (!file) return;

  try {
    // Fetch the file using the URI and convert it into a blob
    const response = await fetch(file.uri);
    const blob = await response.blob();

    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      blob
    );

    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (error) {
    console.error("Upload File Error:", error);
    throw new Error("File upload failed");
  }
}

// Get File Preview
export async function getFilePreview(fileId, type) {
  try {
    let fileUrl;
    if (type === "image") {
      fileUrl = await storage.getFilePreview(
        appwriteConfig.storageId,
        fileId,
        2000,
        2000,
        "top",
        100
      );
    } else {
      throw new Error("Invalid file type");
    }

    return fileUrl;
  } catch (error) {
    console.error("Get File Preview Error:", error);
    throw new Error("Failed to get file preview");
  }
}

// Create Image Post
export async function createImagePost(form) {
  try {
    const imageUrl = await uploadFile(form.image, "image");

    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.imageCollectionId,
      ID.unique(),
      {
        title: form.title,
        image: imageUrl,
        prompt: form.prompt,
        creator: form.userId,
      }
    );

    return newPost;
  } catch (error) {
    console.error("Create Image Post Error:", error);
    throw new Error("Failed to create image post");
  }
}

// Get all image Posts
export async function getAllPosts() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.imageCollectionId
    );
    return posts.documents;
  } catch (error) {
    console.error("Get All Posts Error:", error);
    throw new Error("Failed to get posts");
  }
}

// Get image posts created by user
export async function getUserPosts(userId) {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.imageCollectionId,
      [Query.equal("creator", userId)]
    );
    return posts.documents;
  } catch (error) {
    console.error("Get User Posts Error:", error);
    throw new Error("Failed to get user posts");
  }
}

// Get image posts that matches search query
export async function searchPosts(query) {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.imageCollectionId,
      [Query.search("title", query)]
    );

    if (!posts) throw new Error("Search failed");

    return posts.documents;
  } catch (error) {
    console.error("Search Posts Error:", error);
    throw new Error("Failed to search posts");
  }
}

// Get latest created image posts
export async function getLatestPosts() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.imageCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );

    return posts.documents;
  } catch (error) {
    console.error("Get Latest Posts Error:", error);
    throw new Error("Failed to get latest posts");
  }
}
