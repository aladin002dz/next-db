import PostForm from './components/PostForm';
import DeleteButton from './components/DeleteButton';
import { getPgPosts } from './actions/pgPosts';

// Add cache configuration
export const dynamic = 'force-dynamic';
export const revalidate = 10; // Revalidate every 10 seconds

interface Post {
  id: number;
  title: string;
  content: string;
}

interface SearchParams {
  page?: string;
}

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const currentPage = Number(searchParams.page) || 1;
  const { posts = [], error, pagination } = await getPgPosts(currentPage, 5);
  
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
          <div className="flex flex-col gap-8 w-full">
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
            
            {pagination && pagination.pages > 1 && (
              <div className="flex justify-center gap-2">
                {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
                  <a
                    key={page}
                    href={`?page=${page}`}
                    className={`px-4 py-2 border rounded-md ${
                      page === currentPage
                        ? 'bg-blue-500 text-white'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
