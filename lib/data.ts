export interface Bike {
  id: string;
  name: string;
  price: number;
  deposit: number;
  range: string;
  topSpeed: string;
  image: string;
  tag?: string;
  tagColor?: string;
  description?: string;
  originalPrice?: number;
  licenseRequired?: boolean;
  chargeTime?: string;
}

export const bikes: Bike[] = [
  {
    id: "volt-x-nairobi",
    name: "Volt-X Nairobi Edition",
    price: 100000,
    deposit: 10000,
    range: "80km",
    topSpeed: "45km/h",
    image: "https://picsum.photos/seed/bike1/800/600",
    tag: "Most Popular",
  },
  {
    id: "volt-city-mini",
    name: "Volt City Mini",
    price: 85000,
    deposit: 8500,
    range: "60km",
    topSpeed: "35km/h",
    image: "https://picsum.photos/seed/bike2/800/600",
    tag: "Eco Saver",
    tagColor: "bg-asphalt text-white",
  },
  {
    id: "volt-cargo-pro",
    name: "Volt Cargo Pro",
    price: 150000,
    deposit: 15000,
    range: "120km",
    topSpeed: "50km/h",
    image: "https://picsum.photos/seed/bike3/800/600",
    tag: "Heavy Duty",
  },
  {
    id: "volt-x1-pro",
    name: "Volt X-1 Pro",
    range: "80km",
    topSpeed: "65km/h",
    price: 162000,
    originalPrice: 185000,
    deposit: 15000,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDCSzUppnaWpZlC1P6dmaSaTY9Ho2sB0SOgVTOPNjlZVx1G-ZZWO76TyPHhfSGAW6WuwjZo6AmIf590eyJa65ov_O4oy0-gSYtNd7NB0uQ3xg8icnKr4rUeGNRY-ttHUHExskAcVCKrIQM5xU-hTPZRj5TOM3e14WHQJ8V1txR0eGJ8xWTb4SvW47bpBX7hKikLVsTsrQDLEmH2Ibgir75uv5t7XIjELdbfOSapLzSZys_oKVa4Sm-CtD8zVM0JiLff9SiItxskQiU",
    licenseRequired: false,
    tag: "Top Seller",
  },
  {
    id: "city-runner-s2",
    name: "City Runner S2",
    range: "110km",
    topSpeed: "45km/h",
    price: 145000,
    deposit: 12500,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCfFSMXA8MmdHuDudYMvwh9TDaKZFstOEQ96bDajfy6URiQHu53QWwGjZvEcUDr6LieH_DxddKT1-sVylOL5R-FO8AeyoG_HmBQYUerOA8sP5DbO4QJiOcseuVt_6s9kT1GsV3Ui1f7lYZ-Hl-iepMA9aw_wxG48OYh6GLHqaz8Kqoe_apl0Y8V9nMYcaeFp9L0x8ms1wrreJWrSIeYKpQcjpNCsPb4Vu9w-4DDW4V4uFlC2e6y8Y6y_xumF5a0HG-dD3gfjIBAtPo",
    licenseRequired: false,
    tag: "Eco-Efficient",
  },
  {
    id: "volt-beast-50",
    name: "Volt Beast 5.0",
    range: "150km",
    topSpeed: "120km/h",
    price: 320000,
    deposit: 35000,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBbfgrc-kGJ_uiFJqws_N--T1eEaB7z7g4o1oH8H84erh0dLbqE6ji4vznWs60OSepY2rMqhoFmc6h7MmkTmAw3E44HaLM8-o-jSQ1zr3M5jQzty5DFmHKEMMtyVoRXrCWG8owUv6uFF3zVl83LQt1w6jTtXpsCk-Ix7Zk4ZHWMAj7fpl1hTxxxeJtOUGD3XeTdlSJAsTNRvrWIAFjv7M82SXzhya9LDtzDdTLLsFfuoINjofLp_Rk3iygYEtObHHt7Aky49VRWWZ4",
    licenseRequired: true,
    tag: "High Performance",
  },
];
