'use client'

interface Props {
    title: string;
    subTitle: string;
}

export const TitlePage = ({ subTitle, title }: Props) => {
    return (
        <div className="flex flex-col gap-1">
            <h1>{title}</h1>
            <p>{subTitle}</p>
        </div>
    )
}
