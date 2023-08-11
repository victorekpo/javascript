import { useQuery } from "react-query";
import axios from "axios";

interface Post {
    id: number;
    title: string;
    body: string;
}

const fetchPosts = async (): Promise<Post[]> => {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
    return response.data;
};

const PostsList: React.FC = () => {
    const { isLoading, isError, error, data } = useQuery<Post[], Error>("posts", fetchPosts);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <ul>
            {data.map((post) => (
                <li key={post.id}>{post.title}</li>
            ))}
        </ul>
    );
};

export default PostsList;