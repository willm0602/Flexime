import { useContext, useEffect, useRef } from "react";
import ConfigurationsModalsContext from "./ConfigurationsModalsContext";
import { jsonResumeFromResume } from '../../../lib/resume';

export default function PreviewConfigurationModal() {
    const { previewModal, configuration } = useContext(ConfigurationsModalsContext);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (formRef.current && configuration) {
            formRef.current.submit();
        }
    }, [configuration]);

    return (
        <dialog className="modal" ref={previewModal}>
            <div className="modal-box min-w-[80vw] min-h-[80vh] flex flex-col">
                <form
                    ref={formRef}
                    action="/api/pdf"
                    method="POST"
                    target="resume-preview"
                    style={{ display: 'none' }}
                >
                    <input
                        type="hidden"
                        name="resume_data"
                        defaultValue={configuration && JSON.stringify(jsonResumeFromResume(configuration?.resume))}
                    />
                </form>

                <iframe
                    frameBorder="0"
                    title="Resume Preview"
                    className="w-full h-full min-h-[80vh]"
                    name="resume-preview"
                    id="resume-preview"
                />

            </div>
            <form method="dialog" className="modal-backdrop">
                <button type="submit">close</button>
            </form>
        </dialog>
    );
}
