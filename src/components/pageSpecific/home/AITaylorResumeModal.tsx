import type Resume from "@/lib/resume";
import { useContext } from "react";
import ResumeContext from "./ResumeContext";

export default function AITaylorResume() {
    const { resume, setResume } = useContext(ResumeContext);

    return <dialog id="tailor-with-ai-modal" className="modal">
        <div className="modal-box">
            <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        type="submit"
                >✕</button>
            </form>
            <form
                onSubmit={(e) => {
                    const target = e.target as HTMLFormElement;
                    const formData = new FormData(target);

                    e.preventDefault();
                    fetch('/api/pdf/ai/tailor', {
                        method: 'POST',
                        body: JSON.stringify({
                            resume: resume,
                            jobDescription: formData.get('jobDescription'),
                        }),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }).then((response) => {
                        const status = response.status;
                        if (status === 200) {
                            response.json().then((data) => {
                                console.log(data);
                                setResume(data);
                                const modal = document.getElementById('tailor-with-ai-modal') as HTMLDialogElement;
                                modal.close();
                            });
                        } else if (status === 429) {
                            window.alert('Rate limit exceeded. Please try again later.');
                        } else {
                            response.json().then((data) => {
                                console.error('Error:', data);
                            });
                        }
                    }).catch((error) => {
                        console.error('Error:', error);
                    }
    );
                }}
            >
                <h3 className="font-bold text-lg">Use AI to tailor a job to a job description</h3>
                <input type="hidden" name="resume" value={JSON.stringify(resume )} />
                <textarea placeholder="Job Description"
                          name="jobDescription"
                          className="textarea textarea-primary w-full resize-none"
                          required
                          maxLength={3000}
                />
                <button type="submit" className="btn btn-active mt-2">Tailor Resume</button>
            </form>
        </div>
    </dialog>
}