import Head from 'next/head'

import PostType from '../../types/post'

import markdownToHtml from '../../lib/markdownToHtml'
import { getPostBySlug, getAllPosts } from '../../lib/api'

import Container from '../../components/Container'
import Header from '../../components/Header'
import Layout from '../../components/Layout'
import DateFormatter from '../../components/DateFormatter'
import Signup from '../../components/Signup'
import ListenOn from '../../components/ListenOn'

import markdownStyles from '../../components/markdown-styles.module.css'

type Props = {
  post: PostType
}

type GuestProps = {
  guest: string
  guestLinkedIn: string
}

const Guest = ({ guest, guestLinkedIn }: GuestProps) => {
  return (
    <>
      {guestLinkedIn ? (
        <a href={guestLinkedIn} className="hover:text-brand-blue">
          {guest}
        </a>
      ) : (
        { guest }
      )}
    </>
  )
}

const Post = ({ post }: Props) => {
  return (
    <Layout>
      <Head>
        <title>{post.title} | we@UBC </title>
        <meta
          property="og:image"
          content={`/assets/posts/${post.slug}/og.png`}
        />
      </Head>

      <Container>
        <Header />

        <article className="mt-20">
          <div className="text-sm text-brand-blue font-bold leading-none bg-gray-300 py-2 px-4 rounded-full inline-block">
            Episode #{post.number}
          </div>

          <h1 className="text-6xl md:text-7xl font-bold">{post.title}</h1>

          <p className="text-xl md:text-2xl bg-black text-white rounded-b-lg p-4 md:flex justify-between items-center">
            <span className="block">
              featuring {' '}
              <Guest
                guest={post.guest}
                guestLinkedIn={post.guestLinkedIn}
              />{' '}
              <span className="text-brand-blue">@</span> {post.venture}
            </span>

            <span className="block text-base md:text-lg">
              <DateFormatter dateString={post.date} />
            </span>
          </p>

          <div className="video-container my-10 rounded-t-lg border-2 p-2 border-brand-blue">
            <iframe
              src={post.embed}
              frameBorder="0"
              width="400px"
              height="102px"
              scrolling="no"
            ></iframe> 
          </div>

          <div className="max-w-3xl mx-auto">
            <ListenOn />
          </div>

          <div className="max-w-3xl mx-auto">
            <div
              className={markdownStyles['markdown']}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </article>

        <div className=" text-white rounded-lg bg-brand-blue w-full my-12 md:my-24 leading-tight p-5 md:p-10 font-bold text-xl md:text-2xl space-y-4 md:space-y-8">
          <div className="bg-white rounded-lg p-5 md:p-10">
            <Signup />
          </div>

          <p className="pt-2 md:pt-4">Hey! 👋</p>

          <p>
            I'm {' '}
            <a
              href="https://www.linkedin.com/in/alicezhao1991/"
              className="border-b-4 border-white"
            >
              Alice
            </a>
            . (Clumsy) curious creator.
          </p>

          <p>
            I created we@UBC because I was inspired by my mentors and peers in the  {' '}
            <a
              href="https://www.start.entrepreneurship.ubc.ca/"
              className="border-b-4 border-white"
            >
              e@UBC
            </a>
            {' '} program. 
          
          </p>
          <p>
            <a
              className="border-b-4 border-white"
              href="mailto:azhao991@gmail.com"
            >
              Let me know
            </a>{' '}
            if there is anything you'd like to hear!
          </p>
        </div>

        <style jsx>{`
          .video-container {
            position: relative;
            height: 176px;
          }
          .video-container iframe,
          .video-container object,
          .video-container embed {
            width: 100%;
            height: 100%;
          }
        `}</style>
      </Container>
    </Layout>
  )
}

export default Post

type Params = {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'excerpt',
    'guest',
    'guestLinkedIn',
    'venture',
    'content',
    'embed',
    'number',
  ])

  const content = await markdownToHtml(post.content || '')

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug'])

  return {
    paths: posts.map((posts) => {
      return {
        params: {
          slug: posts.slug,
        },
      }
    }),
    fallback: false,
  }
}
