export const PERSONAS = {
  sales: {
    id: "sales",
    name: "Bán hàng / CSKH",
    jobs: ["Khách hỏi giá + còn hàng", "Khách phàn nàn chậm", "Chốt đơn / hẹn giao"],
  },
  factory: {
    id: "factory",
    name: "Nhà máy / QC / kho",
    jobs: ["Báo lỗi lô hàng", "Xác nhận số lượng và giờ giao", "Hết vật tư / xin dừng chuyền"],
  },
  office: {
    id: "office",
    name: "Văn phòng / điều phối",
    jobs: ["Đổi lịch họp", "Báo cáo sếp: xong gì, kẹt đâu", "Nhắc đối tác gửi hàng"],
  },
};

export const SCRIPTS = {
  en: {
    sales: [
      { prompt: "Khách hỏi: How much is this? Do you still have it?", sample: "It's 12 dollars. Yes, we have it in stock." },
      { prompt: "Khách nói: It's too late.", sample: "I'm sorry for the delay. I will check and update you today." },
      { prompt: "Chốt đơn.", sample: "I can confirm your order. We will deliver tomorrow morning." },
    ],
    factory: [
      { prompt: "Báo lô hàng nứt.", sample: "This batch has cracks. Please hold shipment." },
      { prompt: "Xác nhận số lượng.", sample: "We have 200 pieces ready. Delivery at 3pm." },
      { prompt: "Hết linh kiện.", sample: "We are out of parts. Please stop the line." },
    ],
    office: [
      { prompt: "Đổi lịch họp.", sample: "Can we move the meeting to 4pm today?" },
      { prompt: "Báo sếp.", sample: "The file is done. We are waiting for the invoice." },
      { prompt: "Nhắc đối tác.", sample: "Please send the goods today. Thank you." },
    ],
  },
  zh: {
    sales: [
      { prompt: "Khách hỏi giá và còn hàng.", sample: "这个十二块。还有货。" },
      { prompt: "Khách phàn nàn chậm.", sample: "对不起，晚了。今天我给您回复。" },
      { prompt: "Chốt đơn.", sample: "订单确认了。明天早上送。" },
    ],
    factory: [
      { prompt: "Báo lô nứt.", sample: "这批货有裂纹，先别发货。" },
      { prompt: "Xác nhận số lượng.", sample: "两百件就绪。下午三点送。" },
      { prompt: "Hết vật tư.", sample: "没有零件了，请停线。" },
    ],
    office: [
      { prompt: "Đổi lịch.", sample: "会议改到今天下午四点可以吗？" },
      { prompt: "Báo sếp.", sample: "文件做完了。在等发票。" },
      { prompt: "Nhắc đối tác.", sample: "请今天发货，谢谢。" },
    ],
  },
};

export function coach(text, sample) {
  const said = (text || "").trim();
  if (!said) return { ok: false, note: "Chưa nói. Hôm nay chưa tính là đã học.", next: sample };
  const short = said.length < 6;
  return {
    ok: !short,
    note: short
      ? "Câu quá ngắn. Nói đủ ý: việc gì + số / thời gian / xin lỗi."
      : "Đủ ý. Bài ngày mai sẽ bắt lỗi nặng nếu bạn lặp lại.",
    next: sample,
  };
}
