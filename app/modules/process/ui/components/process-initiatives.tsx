"use client";

/**
 * ProcessInitiatives — Section 02
 *
 * CORRECT Telha Clarke stacking mechanism (reverse-engineered from DOM):
 *
 *  - The `.stack-cards-wrapper` is `position: relative`
 *  - Each `.stack-cards-card` is `position: sticky`
 *  - `top` of each card = NAV_H + (STACK_OFFSET * index)
 *  - The ENTIRE card sticks — not just a header bar
 *  - There is ONE h4 title per card — no duplicate, no separate sticky bar
 *  - As you scroll, card 0 sticks first at the top. Card 1 slides up and
 *    stacks on top of it (higher z-index), covering card 0's content but
 *    leaving card 0's title peeking above. And so on.
 *  - STACK_OFFSET = how many px of the previous card peek above the new one
 *    (roughly the height of the title row + border + top padding)
 *
 *  Layout per card (12-col grid):
 *    - col 1–7  row 1: h4 title
 *    - col 9–12 row-span-2: image panel
 *    - col 1–7  row 2: 2-col paragraph text (items-end)
 */

const NAV_H = 62; // px — fixed navbar height
const STACK_OFFSET = 83; // px — visible peek of each card above the next

const initiatives = [
  {
    id: "01",
    title: "Brand Strategy",
    image:
      "https://telhaclarke.com.au/wp-content/uploads/2025/11/SD-TRANSPARENT-1200x824.png",
    bgColor: "#9b2d1f",
    leftText: [
      "We believe strategy is the invisible architecture of every great brand. Before a single colour is chosen or a wordmark drawn, we immerse ourselves in what drives your organisation.",
      "Our strategic process uncovers territory no competitor has claimed, revealing the authentic positioning that makes your brand not just seen, but felt.",
    ],
    rightText: [
      "At brand+, strategy is never a document — it's a living framework. Every strategic recommendation is rooted in research, tension-tested against competitors, and stress-tested for longevity.",
      "The outcome: a clear brand platform that orients every creative decision from identity to communication.",
    ],
  },
  {
    id: "02",
    title: "Visual Identity",
    image:
      "https://telhaclarke.com.au/wp-content/uploads/2025/11/RAP-TEST-2-TRANSPARENT-1-1200x824.png",
    bgColor: "#c8c8c8",
    leftText: [
      "Visual identity is the language through which a brand speaks without words. We craft systems that are immediately recognisable and infinitely adaptable — from a business card to a billboard.",
      "Every mark we make is grounded in the strategic platform: the logo, typography, colour, and imagery all working in concert.",
    ],
    rightText: [
      "We develop comprehensive brand identity systems that account for every touchpoint your audience will encounter — digital, environmental, print, and motion.",
      "Our process moves from concept exploration through refinement to a rigorous brand standards document your team can use with confidence.",
    ],
  },
  {
    id: "03",
    title: "Digital Branding",
    image:
      "https://telhaclarke.com.au/wp-content/uploads/2025/11/QMS-Test-V4-TRANSPARENT-1200x824.png",
    bgColor: "#9b2d1f",
    leftText: [
      "Digital is where brands are increasingly experienced. We design digital presences that feel as cohesive and intentional as they do innovative — from website UX to social identity systems.",
      "We understand that digital branding is not static. It must perform across rapidly evolving platforms while remaining unmistakably yours.",
    ],
    rightText: [
      "Our digital branding work encompasses web design direction, UI component libraries, motion guidelines, and social content frameworks.",
      "The result is a digital identity that lives and breathes — adapting to context while maintaining the integrity of your brand.",
    ],
  },
  {
    id: "04",
    title: "Brand Governance",
    image:
      "https://telhaclarke.com.au/wp-content/uploads/2025/11/Green-Power-TRANSPARENT-1200x824.png",
    bgColor: "#2d6a4f",
    leftText: [
      "A powerful brand is only as strong as its implementation. We develop the frameworks, guidelines, and tools that ensure your brand is activated consistently across every team, agency, and partner.",
      "Brand governance is not creative policing — it is the infrastructure that lets your brand grow without losing cohesion.",
    ],
    rightText: [
      "We create living brand guidelines, stakeholder training programmes, and brand audit processes that help organisations sustain identity quality over time.",
      "Centralising brand intelligence within your organisation enables every team member to become a confident custodian of the brand.",
    ],
  },
];

export function ProcessInitiatives() {
  return (
    <section className="relative bg-white text-black">
      {/* ── Section header ── */}
      <div className="grid-w py-20 md:py-28 border-t border-black/10">
        <div className="col-span-full md:col-span-2 flex items-start gap-4 uppercase body-12 mb-10 md:mb-0">
          <span className="text-[#cacfcb]">02</span>
          <span className="tracking-widest">Our Initiatives</span>
        </div>
        <div className="col-span-full md:col-start-3 md:col-end-9">
          <h2 className="body-36 md:body-48 xl:body-60 font-bold leading-[1.05] tracking-wide">
            Building trust, inspiring confidence, delivering excellence.
          </h2>
        </div>
        <div className="col-span-full md:col-start-10 md:col-end-13 flex items-end mt-10 md:mt-0">
          <p className="body-14 leading-[1.7] text-black/70">
            Driven by purpose and guided by values, we turn our commitments into
            meaningful actions that inspire confidence and create lasting trust.
          </p>
        </div>
      </div>

      {/* ── Stack cards wrapper ──
          `relative` here is the scroll ancestor that bounds sticky behaviour.
          `px-(--margin)` matches the site's horizontal margin variable.
      ── */}
      <div className="relative px-(--margin)">
        {initiatives.map((item, i) => {
          // Card i sticks at navbar height + (i × peek offset)
          // Higher index = higher z-index = stacks on top of previous cards
          const stickyTop = NAV_H + STACK_OFFSET * i;
          const zIndex = 10 + i;

          return (
            <div
              key={item.id}
              className="sticky"
              style={{ top: stickyTop, zIndex }}
            >
              {/*
                White bg ensures this card covers the content of the card beneath.
                12-col grid mirrors Telha Clarke exactly:
                  h4          → col 1-7,  row 1
                  image panel → col 9-12, row-span-2
                  text cols   → col 1-7,  row 2 (flex items-end)
              */}
              <div className="grid grid-cols-12 gap-x-gutter border-t border-black/20 py-margin bg-white">
                {/* ── Title — only one, no sticky bar duplicate ── */}
                <h4
                  className="col-span-full lg:col-span-7 body-24 md:body-36 font-bold mb-10 lg:mb-14"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {item.title}
                </h4>

                {/* ── Image panel — spans both rows ── */}
                <div className="col-span-full lg:col-start-9 lg:col-end-13 row-span-2 max-lg:my-8">
                  <div
                    className="relative w-full"
                    style={{ paddingTop: "87%", backgroundColor: item.bgColor }}
                  >
                    <div className="absolute inset-0 p-12 md:p-16">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain object-center"
                      />
                    </div>
                    <span className="absolute bottom-4 right-5 body-14 text-white/40 uppercase tracking-widest">
                      {item.id}
                    </span>
                  </div>
                </div>

                {/* ── Two-col body text — bottom-aligned in row 2 ── */}
                <div className="col-span-full lg:col-span-7 flex items-end">
                  <div className="grid grid-cols-2 gap-x-8 w-full">
                    <div className="flex flex-col gap-5">
                      {item.leftText.map((para, j) => (
                        <p
                          key={j}
                          className="body-14 leading-[1.75] text-black/75"
                        >
                          {para}
                        </p>
                      ))}
                    </div>
                    <div className="flex flex-col gap-5">
                      {item.rightText.map((para, j) => (
                        <p
                          key={j}
                          className="body-14 leading-[1.75] text-black/75"
                        >
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
