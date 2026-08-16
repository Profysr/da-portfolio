import { SkillsAndTools } from "@/data/idx";
import { BentoCard } from "./ui/bento-grid";
import { BlurFade } from "./ui/blur-fade";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Marquee } from "./ui/marquee";

export function ToolsMarqueeCard() {
  const totalItems = SkillsAndTools.reduce(
    (acc, cat) => acc + cat.items.length,
    0,
  );

  const topRow = SkillsAndTools.slice(0, 2);
  const bottomRow = SkillsAndTools.slice(2, 4);

  return (
    <BlurFade
      inView
      delay={0.24}
      className="col-span-12 md:col-span-8 md:row-span-3 md:col-start-1 md:row-start-6"
    >
      <BentoCard
        title="Tools & Technologies"
        subtitle="Daily development stack & skills"
        badge={`${totalItems}+ Technologies`}
        className="h-full justify-center overflow-hidden"
      >
        <TooltipProvider delayDuration={0}>
          <div className="relative flex flex-col gap-1 py-2 my-auto overflow-hidden">
            {/* Edge Gradients */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-linear-to-r from-background to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-linear-to-l from-background to-transparent z-10" />

            {/* Top Marquee (Left Scroll) */}
            <Marquee pauseOnHover className="[--duration:30s]">
              {topRow.map((category) => (
                <CategoryCard key={category.category} category={category} />
              ))}
            </Marquee>

            {/* Bottom Marquee (Right Scroll) */}
            <Marquee reverse pauseOnHover className="[--duration:30s]">
              {bottomRow.map((category) => (
                <CategoryCard key={category.category} category={category} />
              ))}
            </Marquee>
          </div>
        </TooltipProvider>
      </BentoCard>
    </BlurFade>
  );
}

function CategoryCard({ category }) {
  return (
    <div className="w-75 shrink-0 rounded border border-white/10 bg-white/2 p-3.5 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-white/4">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-primary/80 mb-2.5">
        {category.category}
      </h4>

      <div className="flex flex-wrap gap-1">
        {category.items.map((item) => (
          <Tooltip key={item.name}>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1 rounded-md border border-white/5 bg-white/5 px-2 py-1 text-xs text-white/90 transition-colors hover:border-white/20 hover:bg-white/10">
                {item.img && (
                  <img
                    src={item.img}
                    alt={`${item.name} logo`}
                    className="h-3.5 w-3.5 object-contain shrink-0"
                    loading="lazy"
                  />
                )}
                <span className="font-medium text-[11px]">{item.name}</span>
              </div>
            </TooltipTrigger>
            {item.subCategory && (
              <TooltipContent side="top" className="text-[10px] px-2 py-0.5">
                {item.subCategory}
              </TooltipContent>
            )}
          </Tooltip>
        ))}
      </div>
    </div>
  );
}
