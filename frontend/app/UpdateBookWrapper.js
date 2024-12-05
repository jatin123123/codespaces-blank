import dynamic from 'next/dynamic';

// Dynamically import UpdateBook component and disable SSR
const UpdateBook = dynamic(() => import('./UpdateBook'), { ssr: false });

export default UpdateBook;
