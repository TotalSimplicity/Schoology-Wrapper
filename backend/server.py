import schoolopy


sc = schoolopy.Schoology(schoolopy.Auth("5f67905791392038ddd23eee702c1313063a4d369", "0bb7886909fe3efab26c0cbf12f69312"))
sc.limit = 1000
courses = sc.get_sections()

for course in courses:
    for member in sc.get_enrollments(course.id):
        print(member.name_first + " " + member.name_middle + " " + member.name_last)