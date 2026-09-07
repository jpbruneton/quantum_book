import Content from "./Content";
import { ContentUnavailable } from "@/app/components/ContentUnavailable";
export default function Page({params}: {params: {lang: string}}) { return params.lang === "fr" || params.lang === "en" ? <Content /> : <ContentUnavailable />; }
