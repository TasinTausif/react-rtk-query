import { useState } from "react"
import { useGetPostsQuery, useCreatePostsMutation } from "./services/jsonPlaceholderApiSlice"

export default function App() {
	const [newPost, setNewPost] = useState({title:'', body:''})

	const { data, isLoading, error, refetch } = useGetPostsQuery()//refetch will fetch again if this func is called
	const [createPost, {isLoading: isCreating, error:createError}] = useCreatePostsMutation()//Fisrt one is the func that will be called for mutation and secondly an obj with fetching info and here renaming after destructuring

	if (isLoading || isCreating) 
		return (
            <div className="flex justify-center items-center h-screen text-xl font-semibold text-blue-600">
                Loading...
            </div>
        )
	
	if (error)
		return (
            <p className="text-center text-red-500 text-xl mt-10">
                There was an error fetching posts.
            </p>
        )

	if(createError)
		return (
            <p className="text-center text-red-500 text-xl mt-10">
                There was an error creating a post.
            </p>
        )

	const posts = data?.map(post => (
		<div key={post.id } className="bg-white shadow-md p-4 rounded-lg border border-gray-200">
			<h4 className="font-semibold text-lg">{post.title}</h4>
			<p className="text-gray-600 mt-1">{post.body}</p>
		</div>
	))

	const handleSubmit = async() => {
		await createPost(newPost)
		refetch()
	}

	return (
		<div className="min-h-screen bg-gray-100 py-10">
			<div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-6 border border-gray-300">
				<h1 className="text-2xl font-bold text-center mb-6 text-blue-600">
                    Create a New Post
                </h1>
				<input 
					type="text" 
					placeholder="Title..." 
					onChange={(e) => setNewPost(prev => ({...prev, title: e.target.value}))}
					className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mb-2"
				/>
				<input 
					type="text" 
					placeholder="Body..."
					onChange={(e) => setNewPost(prev => ({...prev, body: e.target.value}))}
					className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mb-2"
				/>
				<button 
					onClick={handleSubmit}
					disabled={isCreating}
					className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:bg-blue-300"
				>
					{isCreating ? "Creating..." : "Create Post"}
				</button>
			</div>

			<div className="max-w-2xl mx-auto mt-10 space-y-4 px-4">
                <h2 className="text-xl font-bold mb-3 text-gray-700">
                    All Posts
                </h2>
                {posts}
            </div>
		</div>
	)
}
