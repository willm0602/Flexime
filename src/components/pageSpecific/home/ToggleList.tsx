import { useContext } from "react";
import ResumeContext from "./ResumeContext";
import type Togglable from "@/lib/togglable";
import ToggleField from "./ToggleField";
import type Resume from "@/lib/resume";
import { isTogglable } from "@/lib/togglable";

export default function ToggleList(){

    const { resume, setResume } = useContext(ResumeContext);

    return  <ul className='pl-0 overflow-scroll max-h-[70vh]'>
        {Object.entries(resume).map(([key, val]) => {
            if (!isTogglable(val)) return;

            if (
                !(
                    val.val ||
                    (val.children && val.children.length > 0)
                )
            )
                return;

            return (
                <li
                    key={`toggle-field-${key}`}
                    className='list-none'
                >
                    <ToggleField
                        fieldName={key as keyof Resume}
                        // @ts-expect-error type needs to be generic
                        togglable={
                            val as Resume[keyof Resume] &
                                Togglable<unknown>
                        }
                        parent={resume}
                        setParent={setResume}
                    />
                </li>
            );
        })}
    </ul>
}