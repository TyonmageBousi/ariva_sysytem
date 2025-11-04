'use client';

import Image from 'next/image';

type Thought = {        
  title: string;
  text: string;
  src1: string;         
  src2: string;
};

type Props = {
  titleCss: string;
  data: Thought[];     
};

const layout: [string, string][] = [
  ['absolute z-10 left-8 top-16 rotate-[-4deg]', 'absolute z-0 right-8 bottom-8 rotate-[3deg]'],
  ['absolute z-10 right-10 top-10 rotate-[2deg]', 'absolute z-0 left-6 bottom-6 rotate-[-2deg]'],
];

export default function OurProductThoughts({ titleCss:titleCss, data: ourThoughts }: Props) {
  return (
    <div>
      <p className={titleCss}>作り手の想い</p>

      {ourThoughts.map((thought, index) => {
        const [cls1, cls2] = layout[index % layout.length];
        return (
          <div className='relative w-[80%] min-h-[60vh] mx-auto'>
            <p className='relative z-20 text-[1.5rem] text-center mx-auto w-fit mb-6'>
              {thought.title}
            </p>
            <p className='relative z-20 text-[1rem] text-center mx-auto w-[min(50ch,90%)] mb-12'>
              {thought.text.split(/\r?\n/).map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </p>

            <Image
              className={cls1}
              src={thought.src1}
              alt={`${thought.title} イメージ1`}
              width={400}
              height={300}
            />
            <Image
              className={cls2}
              src={thought.src2}
              alt={`${thought.title} イメージ2`}
              width={400}
              height={300}
            />
          </div>
        );
      })}
    </div>
  );
}
