import { create } from "zustand";

interface InquiryState {
    isOpen: boolean;
    context: string | null; // e.g., "Piece: The Velvet Chair" or "General Inquiry"
    openInquiry: (context?: string) => void;
    closeInquiry: () => void;
}

export const useInquiryStore = create<InquiryState>((set) => ({
    isOpen: false,
    context: null,
    openInquiry: (context = "General Inquiry") => set({ isOpen: true, context }),
    closeInquiry: () => set({ isOpen: false, context: null }),
}));
