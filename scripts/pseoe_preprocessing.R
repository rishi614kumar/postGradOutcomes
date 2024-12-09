library(dplyr)

truncate_by_words <- function(label, max_length) {
  words <- strsplit(label, " ")[[1]]
  cum_lengths <- cumsum(nchar(words)) + seq_along(words) - 1
  truncated <- max(which(cum_lengths <= max_length), 0)
  if (truncated < length(words)) {
    return(paste0(paste(words[1:truncated], collapse = " "), "..."))
  } else {
    return(label)
  }
}

preprocess_pseoe <- function(pseoe, degree_mapping, cipcode_mapping, institution_mapping, max_char_length = 25) {
  degree_mapping <- degree_mapping |>
    mutate(degree_level = sprintf("%02d", as.integer(degree_level)))
  
  pseoe <- pseoe |>
    left_join(degree_mapping |> select(degree_level, label), by = "degree_level") |>
    rename(degree_label = label) |>
    left_join(cipcode_mapping |> select(cipcode, label), by = "cipcode") |>
    rename(cipcode_label = label) |>
    left_join(
      institution_mapping |>
        select(institution, label, city, institution_state) |>
        rename(
          institution_label = label,
          institution_city = city
        ),
      by = "institution"
    ) |>
    filter(
      cipcode_label != "All Instructional Programs",
      degree_label != "All Degree Levels",
      !grepl("^Institutions in", institution_label),
      grad_cohort != "0000",
      !cipcode_label %in% c("Multi/Interdisciplinary Studies", 
                            "Multi/Interdisciplinary Studies, Other",
                            "Multi/Interdisciplinary Studies (Consolidated 3000-3099)")
    ) |>
    mutate(
      degree_label = recode(degree_label,
                            "Certificate < 1 year" = "Cert. < 1 yr",
                            "Certificate 1-2 years" = "Cert. 1-2 yrs",
                            "Certificate 2-4 years" = "Cert. 2-4 yrs",
                            "Post-Bacc Certificate" = "Post-Bacc Cert.",
                            "Post-Masters Certificate" = "Post-Masters Cert.",
                            "Doctoral - Research/Scholarship" = "Doctoral - Research",
                            "Doctoral - Professional Practice" = "Doctoral - Prof."),
      cipcode_label = sapply(cipcode_label, truncate_by_words, max_length = max_char_length),
      degree_label = factor(degree_label, levels = unique(degree_label[order(degree_level)])),
      institution_state = ifelse(
        institution_state == "" | is.na(institution_state), 
        "Others", 
        institution_state
      )
    )
  
  return(pseoe)
}