export const formatDate = (date: string | number | Date) => 
  new Date(date).toLocaleString("pt-PT", { 
    day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" 
  });