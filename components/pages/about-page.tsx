"use client";

import { useCurrentLocale, useScopedI18n } from "@locales/client";
import { ReactLenis } from "@studio-freight/react-lenis";
import { motion } from "framer-motion";
export default function AboutPage() {
  const aboutScopedT = useScopedI18n("about");
  const locale = useCurrentLocale();
  return (
    <ReactLenis root>
      <motion.div className="about flex flex-col px-8 py-8">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="font-sans text-6xl self-center gradient-text"
          style={{
            fontWeight: 200,
            letterSpacing: "0.2rem",
          }}
        >
          {aboutScopedT("about")} BookBuddy
        </motion.h2>

        {locale === "en" ? (
          <>
            <motion.h3
              className="font-sans text-4xl text-green-yellow-500 mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              style={{
                fontWeight: 100,
                letterSpacing: "0.2rem",
              }}
            >
              Your Ultimate Reading Companion
            </motion.h3>

            <motion.p
              className="w-3/4 font-sans text-xl mt-12"
              style={{
                fontWeight: 100,
                letterSpacing: "0.1rem",
                lineHeight: "2rem",
              }}
            >
              Welcome to{" "}
              <motion.span className="gradient-text">BookBuddy</motion.span>—the
              intelligent platform designed to elevate your reading experience.
              Whether you&apos;re an avid bookworm, a casual reader, or someone
              looking to rediscover the joy of reading,{" "}
              <motion.span className="gradient-text">BookBuddy</motion.span> is
              here to accompany you on every literary journey.
            </motion.p>

            <motion.h3
              className="font-sans text-4xl text-green-yellow-500 mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              style={{
                fontWeight: 100,
                letterSpacing: "0.2rem",
              }}
            >
              Our missions
            </motion.h3>

            <motion.p
              className="w-3/4 font-sans text-xl mt-12"
              style={{
                fontWeight: 100,
                letterSpacing: "0.1rem",
                lineHeight: "2rem",
              }}
            >
              At BookBuddy, our mission is to empower readers by providing a
              seamless and personalized platform to manage, discover, and engage
              with books. We believe that every reader deserves a tailored
              experience that adapts to their unique preferences and reading
              habits.
            </motion.p>
          </>
        ) : (
          // locale === "vi"
          <>
            <motion.h3
              className="font-sans text-4xl text-green-yellow-500 mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              style={{
                fontWeight: 100,
                letterSpacing: "0.2rem",
              }}
            >
              Đồng hành cùng bạn trên mọi cuốn sách
            </motion.h3>

            <motion.p
              className="w-3/4 font-sans text-xl mt-12"
              style={{
                fontWeight: 100,
                letterSpacing: "0.1rem",
                lineHeight: "2rem",
              }}
            >
              Chào mừng bạn đến với{" "}
              <motion.span className="gradient-text">BookBuddy</motion.span>—nền
              tảng thông minh được thiết kế để nâng cao trải nghiệm đọc sách của
              bạn. Dù bạn là một người đọc sách chuyên nghiệp, một người đọc
              sách thoái mái, hoặc ai đó đang tìm cách khám phá lại niềm vui từ
              việc đọc sách,{" "}
              <motion.span className="gradient-text">BookBuddy</motion.span> sẽ
              luôn đồng hành cùng bạn trên mọi hành trình văn học.
            </motion.p>

            <motion.h3
              className="font-sans text-4xl text-green-yellow-500 mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              style={{
                fontWeight: 100,
                letterSpacing: "0.2rem",
              }}
            >
              Sứ mệnh của chúng tôi
            </motion.h3>

            <motion.p
              className="w-3/4 font-sans text-xl mt-12"
              style={{
                fontWeight: 100,
                letterSpacing: "0.1rem",
                lineHeight: "2rem",
              }}
            >
              Tại BookBuddy, sứ mệnh của chúng tôi là trao quyền cho người đọc
              bằng cách cung cấp một nền tảng mượt mà và cá nhân hóa để quản lý,
              khám phá, và tương tác với sách. Chúng tôi tin rằng mỗi người đọc
              đều xứng đáng có một trải nghiệm được cá nhân hóa phù hợp với sở
              thích và thói quen đọc sách độc đáo của mình.
            </motion.p>
          </>
        )}
      </motion.div>
    </ReactLenis>
  );
}
