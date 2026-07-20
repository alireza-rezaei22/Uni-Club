// app/terms/page.tsx

export default function TermsPage() {
    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
            <div className="max-w-4xl mx-auto bg-gray-700 rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold text-gray-200 mb-8 text-center">
                    قوانین و مقررات
                </h1>
                {/* بخش جدید - قوانین ثبت اطلاعات */}

                <div className="space-y-6 text-gray-400 leading-relaxed">
                    <section>
                        <h2 className="text-xl font-semibold text-gray-200 mb-3 border-b pb-2">
                            ۱. مقدمه
                        </h2>
                        <p className="mb-2">
                            به وب‌سایت ما خوش آمدید. با استفاده از این وب‌سایت، شما موافقت خود را با تمام قوانین و مقررات زیر اعلام می‌کنید. لطفاً قبل از استفاده از خدمات، این قوانین را با دقت مطالعه فرمایید.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-200 mb-3 border-b pb-2">
                            ۲. شرایط استفاده
                        </h2>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>استفاده از سایت برای اهداف غیرقانونی ممنوع است.</li>
                            <li>شما مسئول حفظ امنیت اطلاعات حساب کاربری خود هستید.</li>
                            <li>هرگونه سوءاستفاده از خدمات منجر به مسدود شدن حساب خواهد شد.</li>
                        </ul>
                    </section>
                    <section className="bg-red-50 border-r-4 border-red-500 p-6 rounded-lg">
                        <h2 className="text-xl font-semibold text-red-700 mb-3 flex items-center gap-2">
                            <span>⚠️</span>
                            <span>قوانین ثبت اطلاعات افراد (اساتید، آگهی ها و ...)</span>
                        </h2>
                        <div className="space-y-3 text-red-800">
                            <p className="font-medium">
                                هنگام ثبت اطلاعات هر فرد، رعایت موارد زیر الزامی است:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>
                                    <strong>اطلاعات باید واقعی و دقیق باشد:</strong> از وارد کردن اطلاعات نادرست، ساختگی یا گمراه‌کننده خودداری کنید.
                                </li>
                                <li>
                                    <strong>احترام به حریم خصوصی:</strong> فقط اطلاعاتی را ثبت کنید که مجاز به اشتراک‌گذاری آن هستید. انتشار اطلاعات شخصی دیگران بدون رضایت آنها ممنوع است.
                                </li>
                                <li>
                                    <strong>ممنوعیت توهین و تمسخر:</strong> هرگونه استفاده از عناوین توهین‌آمیز، القاب نامناسب، جوک‌های تحقیرآمیز یا محتوای تمسخرآمیز در فیلدهای نام، توضیحات یا هر بخش دیگر اکیداً ممنوع است.
                                </li>
                                <li>
                                    <strong>عدم سوءاستفاده:</strong> از پلتفرم برای آزار، اذیت یا آسیب رساندن به اعتبار افراد استفاده نکنید.
                                </li>
                                <li>
                                    <strong>مسئولیت قانونی:</strong> کاربر مسئول تمامی اطلاعاتی است که ثبت می کند
                                </li>
                            </ul>
                            <p className="mt-4 p-3 bg-red-100 rounded text-sm">
                                <strong>توجه:</strong> در صورت مشاهده هرگونه تخلف، حساب کاربری شما بلافاصله مسدود شده و اطلاعات ثبت‌شده حذف خواهد شد. همچنین حق پیگیری قانونی برای ما و افراد آسیب‌دیده محفوظ است.
                            </p>
                        </div>
                    </section>
                    <section>
                        <h2 className="text-xl font-semibold text-gray-200 mb-3 border-b pb-2">
                            ۳. حریم خصوصی
                        </h2>
                        <p className="mb-2">
                            ما به حریم خصوصی کاربران احترام می‌گذاریم. اطلاعات شخصی شما فقط برای ارائه بهتر خدمات استفاده می‌شود و بدون رضایت شما در اختیار اشخاص ثالث قرار نمی‌گیرد. برای اطلاعات بیشتر، صفحه سیاست حریم خصوصی را مطالعه فرمایید.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-200 mb-3 border-b pb-2">
                            ۴. حقوق مالکیت معنوی
                        </h2>
                        <p className="mb-2">
                            تمام محتوای موجود در این وب‌سایت شامل متن، تصاویر، لوگو و طراحی‌ها متعلق به ما است و تحت حمایت قوانین کپی‌رایت قرار دارد. هرگونه کپی‌برداری یا استفاده بدون اجازه کتبی ممنوع است.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-200 mb-3 border-b pb-2">
                            ۵. محدودیت مسئولیت
                        </h2>
                        <p className="mb-2">
                            ما تلاش می‌کنیم اطلاعات دقیق و به‌روز ارائه دهیم، اما تضمینی صحت کامل اطلاعات نیست. استفاده از اطلاعات سایت به عهده خود کاربر است و ما مسئولیتی در قبال خسارات احتمالی نداریم.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}