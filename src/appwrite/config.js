
import conf from "../conf/conf";
import { Client,Databases,Storage, Query, ID } from "appwrite";


export class Services{
    client = new Client()
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.projectId)

        this.databases = new Databases(this.client);
        
        this.bucket = new Storage(this.client);

    }

    async createPost({title,slug,content,featuredImage,status,userId}) {
        try {
            return await this.databases.createDocument(conf.databaseId,conf.collectionId,slug,{
                title,
                content,
                featuredImage,
                status,
                userId
            })
            
        } catch (error) {
            console.log("appwrite service:: createPost:: error",error)
        }

    }

    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(conf.databaseId,conf.collectionId,slug,{
                title,
                content,
                featuredImage,
                status
            })
            
        } catch (error) {
            console.log("appwrite servce update error",error)
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(conf.databaseId,conf.projectId,slug)
            return true
        } catch (error) {
            console.log("appwrite service:: deletepost:: error",error)
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(conf.databaseId,conf.collectionId,slug)
        } catch (error) {
            console.log("appwrite service:: getting post:: error",error)
        }
    }


    async getPosts(queries =[Query.equal("status","active")]) {
        try {
            return this.databases.listDocuments(conf.databaseId,conf.collectionId,queries)
        } catch (error) {
            console.log("appwrite service:: lsting out the post:: error",error)
            return false
        }
    }


    // fileupload service
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(conf.bucketId,
                ID.unique(),
                file)
        } catch (error) {
            console.log("file upload error in appwrite service",error)
        }
    }

    async deleteFile(fileId) {
        try {
            return await this.bucket.deleteFile(conf.bucketId,fileId)
            return true
        } catch (error) {
            console.log("file deleting error in appwrite service",error)
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(conf.bucketId,fileId)
    }
      
}

const service = new Services()

export default service