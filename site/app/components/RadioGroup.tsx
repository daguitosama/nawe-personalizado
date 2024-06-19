import * as RadioGroup from "@radix-ui/react-radio-group";
export interface RadioGroupOption {
    id: string;
    value: string;
    label: string;
}
export interface RadioGroupComboProps {
    options: RadioGroupOption[];
    defaultOptionValue?: string;
    onValueChange: (newValue: string) => void;
}

export function RadioGroupCombo({ options, defaultOptionValue, onValueChange }: RadioGroupComboProps) {
    return (
        <RadioGroup.Root
            className='flex flex-col gap-3 '
            defaultValue={defaultOptionValue}
            onValueChange={onValueChange}
        >
            {options.map((option) => {
                return (
                    <div
                        className='flex items-center '
                        key={option.id}
                    >
                        <RadioGroup.Item
                            className='cursor-pointer shrink-0 w-[20px] h-[20px] rounded-full border border-black hover:bg-violet3 focus:shadow-black outline-none'
                            value={option.value}
                            id={option.id}
                        >
                            <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-black" />
                        </RadioGroup.Item>
                        <label
                            className='cursor-pointer leading-none pl-[15px]'
                            htmlFor={option.id}
                        >
                            {option.label}
                        </label>
                    </div>
                );
            })}
        </RadioGroup.Root>
    );
}
