import Link from 'next/link'

import Post from '../types/post'

import DateFormatter from './DateFormatter'

type Props = {
  post: Post;
}

function LatestPost({ post }: Props) {
  return (
    <section className="sm:flex items-center">
      <div className="sm:w-2/3">
        <div className="flex justify-between items-end pb-2 font-bold">
          <h3 className="text-5xl md:text-6xl font-extrabold leading-none">
            Latest Episode
          </h3>

          <DateFormatter dateString={post.date} />
        </div>

        <Link href="/posts/[slug]" as={`/posts/${post.slug}`}>
          <a className="block bg-black rounded-b-lg text-white text-2xl p-10 hover:text-brand-blue hover:cursor-pointer">
            <div className="text-xs bg-brand-blue font-bold leading-none mb-2 text-white py-2 px-4 rounded-full inline-block">
              Episode #{post.number}
            </div>

            <p className="text-5xl md:text-6xl font-bold">
              {post.title}
            </p>

            <p>
              featuring {post.guest} <span className="text-brand-blue">@</span> {post.venture}
            </p>
          </a>
        </Link>
      </div>

      <div className="pt-10 sm:p-10 sm:w-1/3 font-bold">
        <Link href="/posts">
          <a className="link text-6xl text-center">
            More Episodes
          </a>
        </Link>
      </div>
    </section>
  )
}

export default LatestPost