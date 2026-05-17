import { User2 } from "lucide-react";
export default function Comment(props) {
    const { userName, comment } = props;
    
    return (
        <div className="mb-3">
            {comment ?
                <>
                    <span className="relative flex w-fit">
                        <h4 className="w-fit flex items-center gap-2">
                            <span className="bg-zinc-400 w-10 h-10 rounded-full flex justify-center items-center"><User2 /></span>
                            {userName}
                        </h4>
                    </span>
                    <p className="px-8 py-2 italic">
                        {comment}
                    </p>
                </> :
                <p className="px-8 py-2 italic">
                    هنوز هیچ دیدگاهی  ثبت نشده
                </p>
            }
        </div>
    );
}