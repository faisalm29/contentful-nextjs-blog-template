import Image from "next/image";
import Link from "next/link";
import PostCard from "@/components/PostCard";
import siteConfig from "@/config/site";
import readingTime from "reading-time";
import { getEntries } from "../../../lib/contentful";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { NextSeo } from "next-seo";
import { format } from "date-fns";

const PostPage = ({ post, morePosts }) => {
  const body = documentToHtmlString(post.fields.body);
  const stats = readingTime(body);

  return (
    <>
      <div className="max-w-[1046px] mx-auto my-8 px-4 xl:px-0">
        <NextSeo
          title={`${post.fields.title} | ${siteConfig.details.title}`}
          description={post.fields.excerpt}
          openGraph={{
            url: siteConfig.details.url,
            title: post.fields.title,
            description: post.fields.excerpt,
            images: [
              {
                url: `https:${post.fields.thumbnail.fields.file.url}`,
                width: 1200,
                height: 675,
                alt: post.fields.title,
              },
            ],
            siteName: siteConfig.details.title,
            type: "article",
            locale: "id_ID",
          }}
        />
        <article className="border-b-[#F2F2F2] border-b-[1px] pb-16">
          {/* metadata section */}
          <div>
            <time className="block pl-4 mb-4 border-l-4 border-black">
              {format(new Date(post.fields.publishedDate), "MMM d, yyyy")}
            </time>
            <h1 className="text-[39px] font-bold mb-4">{post.fields.title}</h1>
            <div className="flex gap-4 items-center mb-8">
              <Image
                src={`https:${post.fields.author.fields.avatar.fields.file.url}`}
                width={45}
                height={45}
                alt={post.fields.title}
              />
              <div>
                <p>{post.fields.author.fields.name}</p>
                <p>{stats.text}</p>
              </div>
            </div>

            {/* thumbnail section  */}
            <div className="mb-16">
              <Image
                src={`https:${post.fields.thumbnail.fields.file.url}`}
                width={2024}
                height={1012}
                alt={post.fields.title}
                className="rounded-2xl"
              />
            </div>

            {/* body section */}
            <div
              className="prose mx-auto"
              dangerouslySetInnerHTML={{
                __html: body,
              }}
            ></div>
          </div>
        </article>

        {/* read more section */}
        <div className="py-16 border-b-[#F2F2F2] border-b-[1px]">
          <h1 className="text-[31px] font-bold mb-8">Read More</h1>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 sm:grid-cols-2">
            {morePosts.map((_post) => (
              <div key={_post.fields.title} className="md:col-span-4">
                <PostCard post={_post} />
              </div>
            ))}
          </div>
        </div>
        <div className="pt-16">
          <Link href="/" className="text-[20px] font-bold underline">
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const postEntries = await getEntries("post");

  const post = postEntries.find(
    (_post) => _post.fields.slug === context.params?.slug
  );

  const morePosts = postEntries
    .filter((_post) => _post.fields.title !== post.fields.title)
    .slice(0, 3);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
      morePosts,
    },
  };
};

export default PostPage;
