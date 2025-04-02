import { SparklesIcon } from "@heroicons/react/24/solid";

export default function AITaylorTrigger() {
    return <button
        type="button"
        className='btn btn-info text-black no-underline'
        onClick={() => {
            const modal = document.getElementById('tailor-with-ai-modal') as HTMLDialogElement;
            if (!modal){
            return;
            }
            modal.showModal();
        }}
    >
        <SparklesIcon
            width={24}
            height={24}
            title='Tailor resume to job description with AI'
            color='white'
        />
    </button>
}