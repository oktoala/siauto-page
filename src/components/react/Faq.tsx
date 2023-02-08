import { useEffect, useState } from "react";
import { useAutoAnimate } from '@formkit/auto-animate/react'


interface Accordion {
  header: string;
  content: string;
}

interface AccordionProps {
  selected: number | null;
  i: number;
  toggle: (i: number | null) => void;
  item: Accordion;
}

const accordionItem: Accordion[] = [
  {
    'header': 'Gimana isi nilainya kuesionernya?',
    'content': 'Secara default aplikasi akan mengisi random antara angka 3, 4, atau 5. Jika kalian hanya mencentang 3 dan 5 di preferensi, maka aplikasi hanya akan mengisi nilai random antara 3 atau 5.'
  },
  {
    'header': 'Apakah SIAuto menyimpan password?',
    'content': 'Tidak. Karena aplikasinya portable (tidak perlu diinstall) jadi tidak akan ada data yang tersimpan.'
  },
  {
    'header': 'Apakah SIAuto bisa mengisi saran?',
    'content': 'Tidak. Karena kuesioner akan diisi secara random, saran yang diberikan tidak akan tepat sasaran. Default saran yang diberikan adalah emoji ✌️'
  },
  {
    'header': 'Bagaimana fitur dosen favorit berkerja?',
    'content': 'Selama nama yang diketikkan terdapat di dalam nama dosennya, maka dosen tersebut akan diisi kuesionernya. Misal Astriana dan user mengetikkan "Ast", maka akan bernilai true.'
  },
  {
    'header': 'Untuk apa ada fitur browser?',
    'content': 'Itu hanya untuk memastikan jika di PC/Laptop kalian terdapat browser yang dibutuhkan. Karena program sebenarnya hanya menjalankan browser di latar belakang. Jika browser tidak ditemukan, install salah satu dari 3 browser, yaitu Google Chrome, Microsoft Edge, atau Brave Browser'
  },
  {
    'header': 'Kuesioner Tidak Terisi?',
    'content': 'Bisa jadi jaringan kalian bermasalah atau SIA nya lagi error.'
  }
]

const AccordionItem = ({ selected, i, toggle, item }: AccordionProps) => {
  const [parent, enableAnimations] = useAutoAnimate(/* optional config */)
  return <div ref={parent} className={`transition hover:bg-bookmark-white ${selected === i ? 'bg-bookmark-white' : ''} py-1 my-2 `}>
    <div onClick={() => toggle(i)} className="accordion-header cursor-pointer transition flex space-x-5 px-5 items-center h-16">
      <i className={selected === i ? 'fa fa-minus' : 'fa fa-plus'}></i>
      <h3 className={selected === i ? 'font-bold' : ''}>{item.header}</h3>
    </div>
    {selected === i && <div className={`accordion-content px-5 pt-0 overflow-hidden ${selected === i ? 'max-h-full' : 'max-h-0'}`}>
      <p className="leading-6 font-light pl-9 text-justify">
        {item.content}
      </p>
      <button className="hidden rounded-full bg-indigo-600 text-white font-medium font-lg px-6 py-2 my-5 ml-9">Learn more</button>
    </div>}

  </div>
}

export default () => {

  const [selected, setSelected] = useState<null | number>(null);

  const toggle = (i: number | null) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };

  useEffect(() => { console.log(selected) }, [selected])

  return (
    <section id="faq" className="py-20">
      <div className="container">
        <div className="mx-auto px-2">
          <h1 className="text-3xl text-center text-bookmark-blue">Frequently Asked Questions</h1>
          <p className="text-center text-bookmark-grey mt-4">
            Ini adalah pertanyaan yang sering ditanyakan orang
          </p>
        </div>
        <div className="flex flex-col mt-12 mx-auto">
          {accordionItem.map((item, i) => {
            return (
              <AccordionItem i={i} item={item} selected={selected} toggle={toggle} />
            );
          })}
          <button type="button" className="hidden mt-12 self-center btn btn-purple hover:bg-bookmark-white hover:text-black">
            More Info
          </button>
        </div>
      </div>
    </section>
  );
}