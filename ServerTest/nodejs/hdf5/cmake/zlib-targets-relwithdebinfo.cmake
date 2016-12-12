#----------------------------------------------------------------
# Generated CMake target import file for configuration "RelWithDebInfo".
#----------------------------------------------------------------

# Commands may need to know the format version.
set(CMAKE_IMPORT_FILE_VERSION 1)

# Import target "zlib-static" for configuration "RelWithDebInfo"
set_property(TARGET zlib-static APPEND PROPERTY IMPORTED_CONFIGURATIONS RELWITHDEBINFO)
set_target_properties(zlib-static PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELWITHDEBINFO "C;RC"
  IMPORTED_LOCATION_RELWITHDEBINFO "${_IMPORT_PREFIX}/lib/libzlib.lib"
  )

list(APPEND _IMPORT_CHECK_TARGETS zlib-static )
list(APPEND _IMPORT_CHECK_FILES_FOR_zlib-static "${_IMPORT_PREFIX}/lib/libzlib.lib" )

# Import target "zlib-shared" for configuration "RelWithDebInfo"
set_property(TARGET zlib-shared APPEND PROPERTY IMPORTED_CONFIGURATIONS RELWITHDEBINFO)
set_target_properties(zlib-shared PROPERTIES
  IMPORTED_IMPLIB_RELWITHDEBINFO "${_IMPORT_PREFIX}/lib/zlib.lib"
  IMPORTED_LOCATION_RELWITHDEBINFO "${_IMPORT_PREFIX}/bin/zlib.dll"
  )

list(APPEND _IMPORT_CHECK_TARGETS zlib-shared )
list(APPEND _IMPORT_CHECK_FILES_FOR_zlib-shared "${_IMPORT_PREFIX}/lib/zlib.lib" "${_IMPORT_PREFIX}/bin/zlib.dll" )

# Commands beyond this point should not need to know the version.
set(CMAKE_IMPORT_FILE_VERSION)
