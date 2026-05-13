import { User2 } from "lucide-react";
export default function Comment(props) {
    const { name, comment } = props;
    return (
        <div className="mb-3">
            {comment ?
                <>
                    <span className="relative flex w-fit">
                        {/* <h4 className="w-fit before:bg-red-500 before:absolute before:bottom-0 before:left-0 before:w-2/5 before:h-1 after:bg-blue-500 after:bottom-0 after:right-0 after:w-3/5 after:h-1"> */}
                        <h4 className="w-fit flex items-center gap-2">
                            <span className="bg-zinc-400 w-10 h-10 rounded-full flex justify-center items-center"><User2 /></span>
                            {name}
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