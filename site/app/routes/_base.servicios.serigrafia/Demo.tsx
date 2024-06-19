import * as RadioGroup from "@radix-ui/react-radio-group";

const RadioGroupDemo = () => (
    <RadioGroup.Root
        className='flex flex-col gap-3 '
        defaultValue='default'
        aria-label='View density'
        onValueChange={(v) => console.log(v)}
    >
        <div className='flex items-center'>
            <RadioGroup.Item
                className=' w-[20px] h-[20px] rounded-full border border-black hover:bg-violet3 focus:shadow-black outline-none cursor-default'
                value='default'
                id='r1'
            >
                <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-black" />
            </RadioGroup.Item>
            <label
                className='leading-none pl-[15px]'
                htmlFor='r1'
            >
                Default
            </label>
        </div>

        <div className='flex items-center'>
            <RadioGroup.Item
                className=' w-[20px] h-[20px] rounded-full border border-black hover:bg-violet3 focus:shadow-black outline-none cursor-default'
                value='foo'
                id='r2'
            >
                <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-black" />
            </RadioGroup.Item>
            <label
                className='leading-none pl-[15px]'
                htmlFor='r2'
            >
                Foo
            </label>
        </div>
    </RadioGroup.Root>
);

export default RadioGroupDemo;
