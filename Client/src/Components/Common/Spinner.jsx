import { Spinner } from 'flowbite-react';

export default function Component({size}) {
  return (
    <div className="flex flex-wrap justify-center w-full items-center gap-2">
      <Spinner size={size} />
    </div>
    )
}