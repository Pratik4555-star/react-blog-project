import { useCallback } from "react"
import { useForm } from "react-hook-form"
import { Button, Input, Select, Rte } from '../index'
import service from "../../appwrite/config"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"


function Postfrom({ post }) {
    const navigate = useNavigate()
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm(
        {
            defaultValues: {
                title: post?.title || '',
                slug: post?.slug || '',
                content: post?.content || '',
                status: post?.status || 'active',
            },
        })

    const userdata = useSelector(state => state.auth.userdata)
    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? service.uploadFile(data.image[0]) : null

            if (file) {
                service.deleteFile(post.featuredImage)
            }

            const dbPost = await service.updatePost(post.$id, { ...data, featuredImage: file ? file.$id : undefined, });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            };
        } else {
            const file = await service.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await service.createPost({ ...data, userId: userdata.$id })
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if(value & typeof value === 'string') {
            return value
            .trim()
            .toLowerCase()  
            .replace(/[^a-zA-Z\d\s]+/g, "-")
            .replace(/\s/g, "-");
        }
    })

    return (
        <div>Postfrom</div>
    )
}

export default Postfrom