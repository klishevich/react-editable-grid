function compare_priority(a,b) {
  if (a.priority_id < b.priority_id)
    return -1;
  else if (a.priority_id > b.priority_id)
    return 1;
  else 
    return 0;
}

function compare_priority_desc(a,b) {
  return compare_priority(b,a);
}