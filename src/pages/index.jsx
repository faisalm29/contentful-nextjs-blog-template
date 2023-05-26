import FeaturedPostCard from "@/components/FeaturedPostCard";
import PostCard from "@/components/PostCard";
import { getEntries } from "../../lib/contentful";

const Home = ({ posts }) => {
  return (
    <>
      <div className="max-w-[1046px] mx-auto my-8 px-4 xl:px-0">
        <h1 className="text-[39px] font-bold mb-4">Blog</h1>
        <p className="text-[20px] mb-8">Some heading description.</p>
        {/* Posts Section */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 sm:grid-cols-2">
          {posts.map((post, id) => (
            <div
              key={post.fields.title}
              className={`col-span-1 ${
                id === 0 ? "md:col-span-12" : "md:col-span-4"
              }`}
            >
              {id === 0 ? (
                <FeaturedPostCard post={post} />
              ) : (
                <PostCard post={post} />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async () => {
  const posts = await getEntries("post");

  return {
    props: {
      posts,
    },
  };
};

export default Home;
