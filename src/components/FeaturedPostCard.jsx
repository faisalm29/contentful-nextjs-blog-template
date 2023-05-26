import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";

const FeaturedPostCard = ({ post }) => {
  return (
    <div className="md:flex md:items-start md:gap-6">
      {/* Image section */}
      <div className="mb-4 md:mb-0">
        <Image
          src={`https:${post.fields.thumbnail.fields.file.url}`}
          width={1024}
          height={512}
          alt={post.fields.title}
          className="rounded-lg"
        />
      </div>
      {/* Body section */}
      <div>
        <time className="block pl-4 mb-4 border-l-4 border-black">
          {format(new Date(post.fields.publishedDate), "MMM d, yyyy")}
        </time>
        <Link href={`/blog/${post.fields.slug}`} className="inline-block mb-4">
          <h2 className="text-[25px] font-bold md:text-[31px]">
            {post.fields.title}
          </h2>
        </Link>
        <p>{post.fields.excerpt}</p>
      </div>
    </div>
  );
};

export default FeaturedPostCard;
