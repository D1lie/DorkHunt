import Image from "next/image"
import { cn } from "@/lib/utils"

interface BrandLogoProps {
  variant?: "full" | "icon-only" | "name-only" | "compact"
  size?: "desktop" | "mobile" | "footer" | "custom"
  priority?: boolean
  className?: string
  customIconSize?: number
  customNameHeight?: number
  customNameWidth?: number
  showGlow?: boolean
}

interface BrandSizeConfig {
  iconHeight: number
  iconWidth: number
  nameHeight: number
  nameWidth: number
  gap: string
}

function getSizeConfiguration(
  size: "desktop" | "mobile" | "footer" | "custom",
  variant: "full" | "icon-only" | "name-only" | "compact"
): BrandSizeConfig {
  let config: BrandSizeConfig

  switch (size) {
    case "desktop":
      config = {
        iconHeight: 48,
        iconWidth: 48,
        nameHeight: 40,
        nameWidth: 200,
        gap: "gap-0"
      }
      break

    case "mobile":
      config = {
        iconHeight: 32,
        iconWidth: 32,
        nameHeight: 24,
        nameWidth: 135,
        gap: "gap-2"
      }
      break

    case "footer":
      config = {
        iconHeight: 48,
        iconWidth: 48,
        nameHeight: 40,
        nameWidth: 200,
        gap: "gap-0"
      }
      break

    case "custom":
    default:
      config = {
        iconHeight: 38,
        iconWidth: 38,
        nameHeight: 30,
        nameWidth: 170,
        gap: "gap-3"
      }
  }

  if (variant === "compact") {
    config = {
      ...config,
      iconHeight: Math.round(config.iconHeight * 0.9),
      iconWidth: Math.round(config.iconWidth * 0.9),
      nameHeight: Math.round(config.nameHeight * 0.9),
      nameWidth: Math.round(config.nameWidth * 0.9),
      gap: "gap-2"
    }
  }

  return config
}

export function BrandLogo({
  variant = "full",
  size = "desktop",
  priority = false,
  className,
  customIconSize,
  customNameHeight,
  customNameWidth,
  showGlow = false
}: BrandLogoProps) {
  const base = getSizeConfiguration(size, variant)

  const sizeConfig: BrandSizeConfig = {
    ...base,
    iconHeight: customIconSize ?? base.iconHeight,
    iconWidth: customIconSize ?? base.iconWidth,
    nameHeight: customNameHeight ?? base.nameHeight,
    nameWidth: customNameWidth ?? base.nameWidth,
  }

  const showIcon =
    variant === "full" || variant === "icon-only" || variant === "compact"

  const showName =
    variant === "full" || variant === "name-only" || variant === "compact"

  return (
    <div
      className={cn(
        "group flex items-center min-w-fit shrink-0 transition-all duration-300 ease-in-out hover:-translate-y-[1px] hover:brightness-110",
        showIcon && showName ? sizeConfig.gap : "",
        className
      )}
    >
      {showIcon && (
        <div
          className="relative flex items-center justify-center shrink-0"
          style={{
            width: sizeConfig.iconWidth,
            height: sizeConfig.iconHeight
          }}
        >
          {showGlow && (
            <div className="absolute inset-0 rounded-full bg-green-500/15 blur-md" />
          )}

          <Image
            src="/logo.svg"
            alt="DorkHunt icon"
            width={sizeConfig.iconWidth}
            height={sizeConfig.iconHeight}
            className="relative z-10 h-full w-full object-contain"
            priority={priority}
          />
        </div>
      )}

      {showName && (
        <div
          className="relative flex items-center shrink-0 gap-0"
          style={{
            height: sizeConfig.nameHeight
          }}
        >
          <Image
            src="/namelogo.svg"
            alt="DorkHunt"
            width={sizeConfig.nameWidth}
            height={sizeConfig.nameHeight}
            className="h-full w-auto object-contain"
            priority={priority}
          />

          <div className="inline-flex items-center px-1.5 py-0.5 rounded bg-gradient-to-br from-[#7CFF6B] to-[#2AAE4A] text-[10px] font-black text-black leading-none shadow-[0_0_15px_rgba(124,255,107,0.4)] border border-white/20 transform -rotate-1 translate-y-[2px] ml-[-1.2rem]">
            V1.0
          </div>
        </div>
      )}
    </div>
  )
}