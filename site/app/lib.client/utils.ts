export function getMessageLink(phoneNumber: string, message: string) {
    return `https://wa.me/${phoneNumber.replace(/\s/g, "")}?text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;
}
