import PostForm from './components/PostForm';
import DeleteButton from './components/DeleteButton';
import { getPosts } from './actions/posts';

// Add cache configuration
export const dynamic = 'force-dynamic';
export const revalidate = 10; // Revalidate every 10 seconds

interface Post {
  id: number;
  title: string;
  content: string;
}

export default async function Home() {
  const { posts = [], error } = await getPosts();
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-4xl">
        <h1 className="text-3xl font-bold">Create New Post</h1>
        <PostForm />
        
        <h2 className="text-2xl font-bold mt-8">Posts</h2>
        {error ? (
          <p className="text-red-500">Error loading posts: {error}</p>
        ) : posts.length === 0 ? (
          <p className="text-gray-500">No posts yet. Create your first post!</p>
        ) : (
          <div className="grid gap-4 w-full">
            {posts.map((post: Post) => (
              <div key={post.id} className="p-4 border rounded-lg shadow-sm">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold">{post.title}</h2>
                  <DeleteButton postId={post.id} />
                </div>
                <p className="mt-2 text-gray-600">{post.content}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
