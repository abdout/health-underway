import React from 'react'
import Link from 'next/link'
import { Github } from './icon'

interface GithubButtonProps {
    url: string;
}

const GithubButton = ({ url }: GithubButtonProps) => {
    return (
        <Link
            href={url} 
            className='absolute top-8 right-10 reveal-less'>
            <Github className="w-[30px] h-[30px]" />
        </Link>
    )
}

export default GithubButton