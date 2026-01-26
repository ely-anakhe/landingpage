import { create } from 'zustand'

type InquiryState = {
    isOpen: boolean
    contextPiece: { title: string; slug: string } | null
    openInquiry: (piece?: { title: string; slug: string }) => void
    closeInquiry: () => void
}

export const useInquiryStore = create<InquiryState>((set) => ({
    isOpen: false,
    contextPiece: null,
    openInquiry: (piece) => set({ isOpen: true, contextPiece: piece || null }),
    closeInquiry: () => set({ isOpen: false, contextPiece: null }),
}))
